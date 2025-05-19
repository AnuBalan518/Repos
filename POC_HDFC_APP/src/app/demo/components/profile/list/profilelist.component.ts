import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
//import { Customer } from 'src/app/demo/api/customer';
//import { Product } from 'src/app/demo/api/product';
//import { CustomerService } from 'src/app/demo/service/customer.service';
//import { ProductService } from 'src/app/demo/service/product.service';
import { ProductsService } from '../../../service/products.service';
import { Products } from "../../models/products";
import { AppConfig } from "../../models/appconfig";
import { createDefaultProductType } from '../../utils/products.util';
import { EmployeeService } from '../../../service/employee.service';
import { forkJoin } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
    templateUrl: './profilelist.component.html',
    styleUrls: ['./profilelist.component.css'],
    providers: [EmployeeService,
                ProductsService],

})
export class ProfileListComponent implements OnInit {

    //customers: Customer[] = [];

    expandedRowKeys: { [key: string]: boolean } = {};

    // Columns for the table
    cols: any[] = [
        { field: 'name', header: 'Name' },
        { field: 'type', header: 'Type' },
        { field: 'plan_code', header: 'Plan Code' },
        { field: 'intermediary', header: 'Intermediary' },
        { field: 'frequency', header: 'Frequency' },
        { field: 'premiumtype', header: 'Premium Type' },
        { field: 'minSumAssured', header: 'Min Sum Assured' },
        { field: 'maxSumAssured', header: 'Max Sum Assured' },
        { field: 'approval_status', header: 'Approval Status' },
        { field: 'actions', header: 'Actions' }
    ];

        productDialog: boolean = false;

        deleteProductDialog: boolean = false;

        deleteProductsDialog: boolean = false;

        products: Products[] = [];

        product: Products = createDefaultProductType();

        selectedProducts: Products[] = [];

        submitted: boolean = false;

        statuses: any[] = [];

        rowsPerPageOptions = [5, 10, 20];
        isMakerUser = false;
        isApproveEnabled: boolean = true;
        isRejectEnabled: boolean = true;
        approvalStatusOptions: { label: string, value: string }[] = [];
        constructor(
            public employeeService: EmployeeService,
            private router:Router,
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private productsService: ProductsService) { }

        ngOnInit() {
            this.isMakerUser = this.employeeService.isMaker();
            console.log("User Role:", this.isMakerUser)
            this.approvalStatusOptions = [
                        { label: 'New', value: 'New' },
                        { label: 'Approved', value: 'Approved' },
                        { label: 'Rejected', value: 'Rejected' }
                    ];
            this.loadProductTypes();

            // Listen to navigation events to refresh the list
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
              this.loadProductTypes();
            });

        }

        loadProductTypes() {
            this.productsService.getProductTypes().subscribe((data: Products[]) => {
              this.products = data;
              console.log(data);
              console.log("Count", this.products.length)
            });
        }

        openNew() {
             this.product = createDefaultProductType();
             this.submitted = false;
             //this.productDialog = true;
             this.router.navigate(['profile/create'])
        }

        deleteSelectedProducts() {
             this.deleteProductsDialog = true;
        }

        editProduct(product: Products) {
             this.product = { ...createDefaultProductType(), ...product } as Products;
             //this.productDialog = true;
             this.router.navigate(['profile/update', this.product.id]);
        }

        deleteProduct(product: Products) {
             this.deleteProductDialog = true;
             this.product = { ...createDefaultProductType(), ...product } as Products;
        }

        approveProduct(product: Products) {
          this.productsService.updateApprovalStatus(product.id, 'Approved').subscribe(
            updatedProduct => {
              this.messageService.add({
                severity: 'success',
                summary: 'Approved',
                detail: `Product ${updatedProduct.name} approved successfully`
              });
              this.productsService.getProductTypes().subscribe((data: Products[]) => {
                            this.products = data;
                          });
            },
            error => {
              this.messageService.add({
                severity: 'error',
                summary: 'Approval Failed',
                detail: 'Could not approve product'
              });
            }
          );
        }

        rejectProduct(product: Products) {
                  this.productsService.updateApprovalStatus(product.id, 'Reject').subscribe(
                    updatedProduct => {
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Rejected',
                        detail: `Product ${updatedProduct.name} rejected successfully`
                      });
                      this.productsService.getProductTypes().subscribe((data: Products[]) => {
                                    this.products = data;
                                  });
                    },
                    error => {
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Approval Failed',
                        detail: 'Could not reject product'
                      });
                    }
                  );
                }

        approveSelectedProducts(selectedProducts: Products[]) {
            if (!selectedProducts || selectedProducts.length === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'No Products Selected',
                    detail: 'Please select products to approve'
                });
                return;
            }

            const updateObservables = selectedProducts.map(product =>
                this.productsService.updateApprovalStatus(product.id, 'Approved')
            );

            forkJoin(updateObservables).subscribe(
                (updatedProducts: Products[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Approved',
                        detail: `${updatedProducts.length} products approved successfully`
                    });
                    this.productsService.getProductTypes().subscribe((data: Products[]) => {
                                                        this.products = data;
                                                      });
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Approval Failed',
                        detail: 'Could not approve all selected products'
                    });
                }
            );
        }

        rejectSelectedProducts(selectedProducts: Products[]) {
            if (!selectedProducts || selectedProducts.length === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'No Products Selected',
                    detail: 'Please select products to reject'
                });
                return;
            }

            const updateObservables = selectedProducts.map(product =>
                this.productsService.updateApprovalStatus(product.id, 'Rejected')
            );

            forkJoin(updateObservables).subscribe(
                (updatedProducts: Products[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Rejected',
                        detail: `${updatedProducts.length} products rejected successfully`
                    });
                    this.productsService.getProductTypes().subscribe((data: Products[]) => {
                                                        this.products = data;
                                                      });
                },
                (error: any) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Rejection Failed',
                        detail: 'Could not reject all selected products'
                    });
                }
            );
        }

        confirmDeleteSelected() {
             this.deleteProductsDialog = false;
             this.products = this.products.filter(val => !this.selectedProducts.includes(val));
             const idsToDelete = this.selectedProducts.map(p => p.id);

             idsToDelete.forEach(id => {
                  this.productsService.deleteProductType(id).subscribe({
                      next: () => {
                           console.log(`Product with ID ${id} deleted successfully`);
                            // Remove from local list after successful deletion
                            this.products = this.products.filter(p => p.id !== id);
                      },
                      error: (err: any) => {
                            console.error(`Error deleting product with ID ${id}:`, err);
                      }
                  });
             });
             this.selectedProducts = [];
             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
             this.selectedProducts = [];
        }

        confirmDelete() {
             this.deleteProductDialog = false;
             this.products = this.products.filter(val => val.id !== this.product.id);
             this.productsService.deleteProductType(this.product.id).subscribe({
                 next: () => {
                   console.log("ProductType deleted successfully");
                 },
                 error: (err: any) => {
                   console.error("Error deleting ProductType:", err);
                 }
               });
             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
             this.product = createDefaultProductType();
        }

        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        }

         saveProduct() {

         }

         findIndexById(id: number): number {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
         }

        createId(): string {
            let id = '';
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }

        onGlobalFilter(table: Table, event: Event) {
            table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
        }

    // Handle the change in expandedRowKeys
        onExpandedRowKeysChange(event: any) {
            this.expandedRowKeys = event;  // Update the expandedRowKeys with the new state
        }

    toggleRowExpansion(products: any, event: Event) {
        console.log(products);
        event.preventDefault();  // Prevent the default anchor behavior
        this.expandedRowKeys[products.id] = !this.expandedRowKeys[products.id];
    }

     isProductEnabled(product: Products): boolean {
            // Replace with your own logic to determine enabled state
            return product.approval_status !== 'Approved' && product.approval_status !== 'Rejected';
        }

    get isAllEnabledSelected(): boolean {
            const enabledProducts = this.products.filter(this.isProductEnabled);
            return enabledProducts.length > 0 && enabledProducts.every(product =>
                this.selectedProducts.includes(product)
            );
        }

        // Getter to determine if some enabled items are selected
        get isSomeEnabledSelected(): boolean {
            const enabledProducts = this.products.filter(this.isProductEnabled);
            return (
                enabledProducts.some(product => this.selectedProducts.includes(product)) &&
                !this.isAllEnabledSelected
            );
        }
        // Toggle selection of all enabled items
            toggleAllEnabled(event: any): void {
                console.log("Toggle")
                if (event.checked) {
                    this.selectedProducts = [
                        ...this.selectedProducts,
                        ...this.products.filter(
                            product => this.isProductEnabled(product) &&
                                                           product.approval_status !== 'Approved' && // Exclude approved products
                                                           product.approval_status !== 'Rejected' && // Exclude rejected products
                                                           !this.selectedProducts.includes(product) // Avoid duplicates
                        )
                    ];
                } else {
                    this.selectedProducts = this.selectedProducts.filter(
                        product => !this.isProductEnabled(product) &&
                                                       product.approval_status !== 'Approved' && // Exclude approved products
                                                       product.approval_status !== 'Rejected' && // Exclude rejected products
                                                       !this.selectedProducts.includes(product) // Avoid duplicates
                    );
                }
            }
        exportFullData() {
          const columns = [
            { header: 'Name', key: 'name' },
            { header: 'Type', key: 'type' },
            { header: 'Frequency', key: 'frequency' },
            { header: 'Premium Term', key: 'premiumType' },
            { header: 'Installment Type', key: 'installmentType' },
            { header: 'Installment Premium', key: 'installmentPremium' },
            { header: 'Sum Assured', key: 'sumAssured' },
            { header: 'Approval Status', key: 'approval_status' },
            { header: 'UIN Number', key: 'uinNumber' },
            { header: 'Age at Entry', key: 'ageAtEntry' },
            { header: 'Maturity Age', key: 'maturityAge' },
            { header: 'Intermediary', key: 'intermediary' },
            { header: 'Limited Premium Term', key: 'limitedPremiumTerm' },
            { header: 'Policy Term', key: 'policyTerm' },
            { header: 'Single Premium', key: 'singlePremium' },
            { header: 'Clawback', key: 'clawback' },
            { header: 'Product Launch Date', key: 'productLaunchDate' },
            { header: 'Product Exit Date', key: 'productExitDate' },
            { header: 'Annuity Purchase Price', key: 'annuityPurchasePrice' }
          ];

          // Create the rows based on the products data
          const rows = this.products.map(product => {
            const row: any = {};
            columns.forEach(column => {
              // Use type assertion to allow dynamic property access
              row[column.header] = (product as any)[column.key] || ''; // Default to empty string if data is missing
            });
            return row;
          });

          const csvData = this.generateCSV(columns.map(col => col.header), rows); // Extract column headers
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'ProductsExport.csv');
        }

        private generateCSV(columns: string[], rows: any[]): string {
          // Join column headers as a CSV header
          const header = columns.join(',');

          // Map rows to CSV format, ensuring proper quoting for data with commas
          const csvRows = rows.map(row =>
            columns.map(column => `"${row[column] || ''}"`).join(',')
          );

          // Return the complete CSV content
          return [header, ...csvRows].join('\n');
        }


}

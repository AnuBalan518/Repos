import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { ProfileService } from '../../../service/profile.service';
import { ProductType } from "../../models/producttype";
import { AppConfig } from "../../models/appconfig";
import { createDefaultProductType } from '../../utils/producttype.util';
import { EmployeeService } from '../../../service/employee.service';
import { forkJoin } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
    templateUrl: './profilelist.component.html',
    styleUrls: ['./profilelist.component.css'],
    providers: [EmployeeService]
})
export class ProfileListComponent implements OnInit {

    customers: Customer[] = [];

    expandedRowKeys: { [key: string]: boolean } = {};

    // Columns for the table
    cols: any[] = [
        { field: 'name', header: 'Name' },
        { field: 'type', header: 'Type' },
        { field: 'frequency', header: 'Frequency' },
        { field: 'premiumTerm', header: 'Premium Term' },
        { field: 'installmentType', header: 'Installment Type' },
        { field: 'installmentPremium', header: 'Installment Premium' },
        { field: 'sumAssured', header: 'Sum Assured' },
        { field: 'actions', header: 'Actions' }
    ];

        productDialog: boolean = false;

        deleteProductDialog: boolean = false;

        deleteProductsDialog: boolean = false;

        products: ProductType[] = [];

        product: ProductType = createDefaultProductType();

        selectedProducts: ProductType[] = [];

        submitted: boolean = false;

        statuses: any[] = [];

        rowsPerPageOptions = [5, 10, 20];
        isMakerUser = false;
        isApproveEnabled: boolean = true;
        isRejectEnabled: boolean = true;
        approvalStatusOptions: { label: string, value: string }[] = [];
        constructor(
            public employeeService: EmployeeService,
            private router:Router,private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService, private profileService: ProfileService) { }

        ngOnInit() {
            this.isMakerUser = this.employeeService.isMaker();
            console.log("User Role:", this.isMakerUser)
            this.approvalStatusOptions = [
                        { label: 'New', value: 'New' },
                        { label: 'Approved', value: 'Approved' },
                        { label: 'Rejected', value: 'Rejected' }
                    ];
            this.profileService.getProductTypes().subscribe((data: ProductType[]) => {
              this.products = data;
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

        editProduct(product: ProductType) {
             this.product = { ...createDefaultProductType(), ...product } as ProductType;
             //this.productDialog = true;
             this.router.navigate(['profile/update', this.product.id]);
        }

        deleteProduct(product: ProductType) {
             this.deleteProductDialog = true;
             this.product = { ...createDefaultProductType(), ...product } as ProductType;
        }

        approveProduct(product: ProductType) {
          this.profileService.updateApprovalStatus(product.id, 'Approved').subscribe(
            updatedProduct => {
              this.messageService.add({
                severity: 'success',
                summary: 'Approved',
                detail: `Product ${updatedProduct.name} approved successfully`
              });
              this.profileService.getProductTypes().subscribe((data: ProductType[]) => {
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

        rejectProduct(product: ProductType) {
                  this.profileService.updateApprovalStatus(product.id, 'Reject').subscribe(
                    updatedProduct => {
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Rejected',
                        detail: `Product ${updatedProduct.name} rejected successfully`
                      });
                      this.profileService.getProductTypes().subscribe((data: ProductType[]) => {
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

        approveSelectedProducts(selectedProducts: ProductType[]) {
            if (!selectedProducts || selectedProducts.length === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'No Products Selected',
                    detail: 'Please select products to approve'
                });
                return;
            }

            const updateObservables = selectedProducts.map(product =>
                this.profileService.updateApprovalStatus(product.id, 'Approved')
            );

            forkJoin(updateObservables).subscribe(
                (updatedProducts: ProductType[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Approved',
                        detail: `${updatedProducts.length} products approved successfully`
                    });
                    this.profileService.getProductTypes().subscribe((data: ProductType[]) => {
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

        rejectSelectedProducts(selectedProducts: ProductType[]) {
            if (!selectedProducts || selectedProducts.length === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'No Products Selected',
                    detail: 'Please select products to reject'
                });
                return;
            }

            const updateObservables = selectedProducts.map(product =>
                this.profileService.updateApprovalStatus(product.id, 'Rejected')
            );

            forkJoin(updateObservables).subscribe(
                (updatedProducts: ProductType[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Rejected',
                        detail: `${updatedProducts.length} products rejected successfully`
                    });
                    this.profileService.getProductTypes().subscribe((data: ProductType[]) => {
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
                  this.profileService.deleteProductType(id).subscribe({
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
             this.profileService.deleteProductType(this.product.id).subscribe({
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

    toggleRowExpansion(product: any, event: Event) {
        console.log(product);
        event.preventDefault();  // Prevent the default anchor behavior
        this.expandedRowKeys[product.id] = !this.expandedRowKeys[product.id];
    }

     isProductEnabled(product: ProductType): boolean {
            // Replace with your own logic to determine enabled state
            return product.approvalstatus !== 'Approved' && product.approvalstatus !== 'Rejected';
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
                                                           product.approvalstatus !== 'Approved' && // Exclude approved products
                                                           product.approvalstatus !== 'Rejected' && // Exclude rejected products
                                                           !this.selectedProducts.includes(product) // Avoid duplicates
                        )
                    ];
                } else {
                    this.selectedProducts = this.selectedProducts.filter(
                        product => !this.isProductEnabled(product) &&
                                                       product.approvalstatus !== 'Approved' && // Exclude approved products
                                                       product.approvalstatus !== 'Rejected' && // Exclude rejected products
                                                       !this.selectedProducts.includes(product) // Avoid duplicates
                    );
                }
            }
        exportFullData() {
          const columns = [
            { header: 'Name', key: 'name' },
            { header: 'Type', key: 'type' },
            { header: 'Frequency', key: 'frequency' },
            { header: 'Premium Term', key: 'premiumTerm' },
            { header: 'Installment Type', key: 'installmentType' },
            { header: 'Installment Premium', key: 'installmentPremium' },
            { header: 'Sum Assured', key: 'sumAssured' },
            { header: 'Approval Status', key: 'approvalStatus' },
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

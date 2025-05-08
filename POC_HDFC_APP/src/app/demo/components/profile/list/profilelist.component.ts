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
import { LoginService } from '../../../service/login.service';


@Component({
    templateUrl: './profilelist.component.html',
    providers: [LoginService]
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
        constructor(
            public loginService: LoginService,
            private router:Router,private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService, private profileService: ProfileService) { }

        ngOnInit() {
            this.isMakerUser = this.loginService.isMaker();
            console.log("User Role:", this.isMakerUser)

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
          this.profileService.updateApprovalStatus(product.id).subscribe(
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

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from "../components/models/products";
import { AppConfig } from "../components/models/appconfig";
import { environment } from "../../../environment/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //private apiUrl = 'http://localhost:8080/api/';
  private apiUrl = `${environment.apiBaseUrl}`;
  private products: Products[] = [];

  constructor(private http: HttpClient) {}

  getConfigByCategory(category: string): Observable<AppConfig[]> {
    return this.http.get<AppConfig[]>(`${this.apiUrl}/config/category/${category}`);
  }

  saveProductType(products: Products): Observable<Products> {
      this.products.push(products);
      return this.http.post<Products>(`${this.apiUrl}/products/create`, products);
  }

  updateProductType(products: Products, id: number): Observable<Products> {
        this.products.push(products);
        return this.http.put<Products>(`${this.apiUrl}/products/update/${id}`, products);
    }

  updateApprovalStatus(id: number, status: string): Observable<Products> {
      if (status == "Approved") {
        return this.http.put<Products>(`${this.apiUrl}/products/approve/${id}`, {});
       }
      else {
          return this.http.put<Products>(`${this.apiUrl}/products/reject/${id}`, {});
          }
    }

  getProductTypes(): Observable<Products[]> {
      return this.http.get<Products[]>(`${this.apiUrl}/products/all`);
  }

  getProductTypeById(id: number) {
      return this.http.get<Products>(`${this.apiUrl}/products/${id}`);
    }

  deleteProductType(id: number): Observable<any> {
      console.log("Delete", id);
      //Return from API is text, and explicitly mentioned response as json from text.
      return this.http.delete(`${this.apiUrl}/products/delete/${id}`, {
        responseType: "text" as "json",
      });
    }

    getCountByApprovalStatus(approvalStatus: string): Observable<number> {
        return this.http.get<number>(
          `${this.apiUrl}/products/count?approvalStatus=${approvalStatus}`
        );
      }
}

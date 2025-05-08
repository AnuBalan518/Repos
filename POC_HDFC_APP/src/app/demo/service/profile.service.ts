import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from "../components/models/producttype";
import { AppConfig } from "../components/models/appconfig";
import { environment } from "../../../environment/environment"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //private apiUrl = 'http://localhost:8080/api/';
  private apiUrl = `${environment.apiBaseUrl}`;
  private producttypes: ProductType[] = [];

  constructor(private http: HttpClient) {}

  getConfigByCategory(category: string): Observable<AppConfig[]> {
    return this.http.get<AppConfig[]>(`${this.apiUrl}/config/category/${category}`);
  }

  saveProductType(producttype: ProductType): Observable<ProductType> {
      this.producttypes.push(producttype);
      return this.http.post<ProductType>(`${this.apiUrl}/product-types/create`, producttype);
  }

  updateProductType(producttype: ProductType, id: number): Observable<ProductType> {
        this.producttypes.push(producttype);
        return this.http.put<ProductType>(`${this.apiUrl}/product-types/update/${id}`, producttype);
    }

  updateApprovalStatus(id: number): Observable<ProductType> {
        return this.http.put<ProductType>(`${this.apiUrl}/product-types/approve/${id}`, {});
    }

  getProductTypes(): Observable<ProductType[]> {
      return this.http.get<ProductType[]>(`${this.apiUrl}/product-types/all`);
  }

  getProductTypeById(id: number) {
      return this.http.get<ProductType>(`${this.apiUrl}/product-types/${id}`);
    }

  deleteProductType(id: number): Observable<any> {
      console.log("Delete", id);
      //Return from API is text, and explicitly mentioned response as json from text.
      return this.http.delete(`${this.apiUrl}/product-types/delete/${id}`, {
        responseType: "text" as "json",
      });
    }
}

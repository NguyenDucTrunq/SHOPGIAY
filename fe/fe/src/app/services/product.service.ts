import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://localhost:7053/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Thêm các phương thức thêm, sửa, xóa nếu cần
}

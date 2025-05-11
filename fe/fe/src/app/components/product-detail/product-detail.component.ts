import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  private productService = inject(ProductService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(+id).subscribe(data => {
        this.product = data;
      });
    }
  }

  getImageUrl(imageURL?: string): string {
    if (!imageURL) return '/assets/images/logo.png';
    if (imageURL.startsWith('http')) return imageURL;
    // Nếu imageURL là đường dẫn backend trả về kiểu /uploads/abc.jpg thì nối domain backend
    return 'https://localhost:7053' + imageURL;
  }
}

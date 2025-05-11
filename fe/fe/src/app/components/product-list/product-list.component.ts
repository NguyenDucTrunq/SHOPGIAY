import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

interface PriceRange {
  min: number;
  max: number;
  label?: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: { [key: string]: Product[] } = {};
  brands: string[] = [];
  selectedBrands: Set<string> = new Set();
  searchTerm: string = '';

  priceRange: PriceRange = {
    min: 0,
    max: 10000000
  };

  predefinedPriceRanges: PriceRange[] = [
    { min: 0, max: 500000, label: 'Dưới 500k' },
    { min: 500000, max: 1000000, label: '500k - 1tr' },
    { min: 1000000, max: 2000000, label: '1tr - 2tr' },
    { min: 2000000, max: 5000000, label: '2tr - 5tr' },
    { min: 5000000, max: Infinity, label: 'Trên 5tr' }
  ];

  private productService = inject(ProductService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Load products first
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.brands = this.getUniqueBrands(data);
      
      // Subscribe to query params after products are loaded
      this.route.queryParams.subscribe(params => {
        this.searchTerm = params['search'] || '';
        this.filterProducts();
      });
    });
  }

  updatePriceRange(type: 'min' | 'max', event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.priceRange[type] = value;
  }

  applyPriceFilter() {
    this.filterProducts();
  }

  applyQuickPriceFilter(min: number, max: number) {
    this.priceRange = { min, max };
    this.filterProducts();
  }

  isPriceRangeActive(range: PriceRange): boolean {
    return this.priceRange.min === range.min && this.priceRange.max === range.max;
  }

  getUniqueBrands(products: Product[]): string[] {
    const uniqueBrands = new Set<string>();
    products.forEach(product => {
      if (product.brand) {
        uniqueBrands.add(product.brand);
      }
    });
    return Array.from(uniqueBrands).sort();
  }

  toggleBrandFilter(brand: string) {
    if (this.selectedBrands.has(brand)) {
      this.selectedBrands.delete(brand);
    } else {
      this.selectedBrands.add(brand);
    }
    this.filterProducts();
  }

  filterProducts() {
    let filteredProducts = [...this.products];

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.productName.toLowerCase().includes(term)
      );
    }

    // Filter by brands
    if (this.selectedBrands.size > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand && this.selectedBrands.has(product.brand)
      );
    }

    // Filter by price
    filteredProducts = filteredProducts.filter(product => 
      product.price >= this.priceRange.min && 
      product.price <= this.priceRange.max
    );

    // Update categories with filtered products
    this.categories = this.groupByCategory(filteredProducts);
  }

  groupByCategory(products: Product[]): { [key: string]: Product[] } {
    return products.reduce((acc, product) => {
      const cat = product.category || 'Khác';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });
  }

  getImageUrl(imageURL?: string): string {
    if (!imageURL) return '/assets/images/logo.png';
    if (imageURL.startsWith('http')) return imageURL;
    return 'https://localhost:7053' + imageURL;
  }

  getAllProducts(): Product[] {
    return Object.values(this.categories).flat();
  }
}

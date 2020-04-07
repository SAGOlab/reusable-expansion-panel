import { Component, Renderer2, ElementRef } from '@angular/core';
import { ComponentLoaderService } from './accordion/component-loader.service';
import { OrderSpecsComponent } from './order-specs/order-specs.component';
import { SupplyingComponent } from './supplying/supplying.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'CARRELLO 1';
  order: any;

  constructor(private componentLoaderService: ComponentLoaderService, private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    
    this.order = this.componentLoaderService.open(OrderSpecsComponent, { data:
      {
        title: 'title 1',
        description: 'test'
      }
    });

    this.renderer.appendChild(this.elementRef.nativeElement, this.order);

    const supply = this.componentLoaderService.open(SupplyingComponent, { data:
      {
        title: 'another title',
        description: 'test 2'
      }
    });

    this.renderer.appendChild(this.elementRef.nativeElement, supply);
  }
}

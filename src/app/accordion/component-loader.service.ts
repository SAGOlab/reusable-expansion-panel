import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { ComponentLoader } from './component-loader';
import { OrderSpecsComponent } from '../order-specs/order-specs.component';
import { SupplyingComponent } from '../supplying/supplying.component';
import { AccordionComponent } from './accordion.component';
import { AccordionConfig } from './accordion-config';
import { AccordionRef } from './accordion-ref';
import { AccordionInjector } from './accordion-injector';

@Injectable()
export class ComponentLoaderService {
  accordionComponentRef: ComponentRef<AccordionComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

  public open(componentType: Type<any>, config: AccordionConfig) {
    const accordionRef = this.appendDialogComponentToBody(config);

    this.accordionComponentRef.instance.childComponentType = componentType;

    return accordionRef;
  }

  private appendDialogComponentToBody(config: AccordionConfig) {
    const map = new WeakMap();
    map.set(AccordionConfig, config);

    const dialogRef = new AccordionRef();
    map.set(AccordionRef, dialogRef);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AccordionComponent);
    const componentRef = componentFactory.create(new AccordionInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    this.accordionComponentRef = componentRef;

    return domElem;
  }

}
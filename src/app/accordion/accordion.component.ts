import { Component, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { ComponentLoaderDirective } from './component-loader.directive';

import { Subject } from 'rxjs';
import { AccordionConfig } from './accordion-config';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements AfterViewInit {
  componentRef: ComponentRef<any>;

  @ViewChild(ComponentLoaderDirective, {static: true}) componentLoaderHost: ComponentLoaderDirective;
  childComponentType: Type<any>;

  panelOpenState = false;
  console = console;
  @Input() hideToggle: boolean;
  @Input() multi: boolean;
  @Input() panelTitle: string;
  @Input() panelDescription: string;
  @Input() matExpansionPanelContent: boolean;
  @Input() isDisabled: boolean;
  @Input() cta: boolean;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public config: AccordionConfig
  ) { }

  ngAfterViewInit() {
    this.loadComponent(this.childComponentType);
  }

  loadComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.componentLoaderHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }


}

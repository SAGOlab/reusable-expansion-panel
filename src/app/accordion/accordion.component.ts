import {
  Component,
  Type,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef,
  Input
} from "@angular/core";
import { ComponentLoaderDirective } from "./component-loader.directive";

import { Subject } from "rxjs";
import { AccordionConfig } from "./accordion-config";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"]
})
export class AccordionComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  @ViewChild(ComponentLoaderDirective, { static: true })
  componentLoaderHost: ComponentLoaderDirective;
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
    public config: AccordionConfig,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.loadComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  loadComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );

    let viewContainerRef = this.componentLoaderHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  removeComponent() {
    return this.onClose;
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}

import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Config, Menu } from './types';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  expandedIndex = 0;
  @ViewChild('submenu', { static: false }) divHello: ElementRef | undefined;
  divHeight: number = 0;
  showFiller = false;
  @Input() options: Config = { multi: false };


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  @Input() menus: Menu[] = [
    {
      name: 'First Level One',
      iconClass: 'home',
      active: true,
      submenu: [
        {
          name: 'Second Level One', active: true, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
        {
          name: 'Second Level Two', active: false, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
      ]
    },
    {
      name: 'First Level Two',
      iconClass: 'maps_home_work',
      active: false,
      submenu: [
        {
          name: 'Second Level One', active: false, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
        {
          name: 'Second Level Two', active: false, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
      ]
    },
    {
      name: 'Web Browser',
      iconClass: 'waterfall_chart',
      active: false,
      submenu: [
        {
          name: 'Second Level One', active: false, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
        {
          name: 'Second Level Two', active: false, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
      ]
    },
    {
      name: 'Example',
      iconClass: 'data_exploration',
      active: false,
      submenu: [
        {
          name: 'Second Level One', active: false, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
        {
          name: 'Second Level Two', active: false, submenu: [
            { name: 'Third Level One', url: '#' },
            { name: 'Third Level Two', url: '#' },
            { name: 'Third Level Three', url: '#' }
          ]
        },
      ]
    }

  ];
  config: Config = { multi: false };
  breakpoint: number = 0;
  breakpointTwo: number = 0;
  constructor(private elRef: ElementRef, private renderer: Renderer2, ) { }

  ngOnInit() {
    this.config = this.mergeConfig(this.options);
    this.breakpoint =
      window.innerWidth <= 600
        ? 1
        : window.innerWidth <= 800
          ? 2
          : window.innerWidth <= 1000
            ? 3
            : 4;

    this.breakpointTwo =
      window.innerWidth <= 600
        ? 1

        : 2;
  }
  onResize(event: any) {
    this.breakpoint =
      event.target.innerWidth <= 600
        ? 1
        : event.target.innerWidth <= 800
          ? 2
          : event.target.innerWidth <= 1000
            ? 3
            : 4;
  }

  ngAfterViewInit(): void {

    console.log(this.elRef.nativeElement.querySelector('#wave0').scrollHeight);


  }

  mergeConfig(options: Config) {
    // 기본 옵션
    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }

  toggle(index: number) {
    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }
    this.menus[index].active = !this.menus[index].active;
  }


  toggleTwo(indexMain: number, indexSub: number, r: any) {

    if (!this.config.multi) {
      this.menus[indexMain].submenu.filter(
        (menu, i) => i !== indexSub && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }



    for (let indexR = 0; indexR < this.menus[indexMain].submenu.length; indexR++) {
      if (indexR !== indexSub) {
        const element = this.menus[indexMain].submenu[indexR];
        console.log(element);
        element.active = false;

      }
    }

    this.menus[indexMain].submenu[indexSub].active = !this.menus[indexMain].submenu[indexSub].active;
    var qsd = this.elRef.nativeElement.querySelector(`#wave${indexMain}`);

    console.log(qsd.clientHeight);

    if (this.menus[indexMain].submenu[indexSub].active) {
      this.renderer.setStyle(this.elRef.nativeElement.querySelector(`#wave${indexMain}`), "height", 277 + "px");
    } else {
      this.renderer.setStyle(this.elRef.nativeElement.querySelector(`#wave${indexMain}`), "height", 122 + "px");
    }
  }

}

import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings, Device } from './devices.model';
import { DeviceService } from '../../services/device.service';
import { MenuService } from '../../theme/components/menu/menu.service';
import { TranslateService } from '@ngx-translate/core';
 

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ DeviceService, MenuService ]
})
export class DevicesComponent implements OnInit {

  public menuItems:Array<any>;  
  public users: User[];
  public user: User;
  public device: Device=new Device();
  public devices:Device[];
  public searchText: string;
  public p:any;
  public type:string = 'grid';
  public modalRef: NgbModalRef;
  public form:FormGroup;
  public genders = ['male', 'female'];
  public genderOption:string;
 
  public menuSelectSettings: IMultiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-secondary btn-block',
      dynamicTitleMaxItems: 0,
      displayAllSelectedText: true,
      showCheckAll: true,
      showUncheckAll: true
  };
  public menuSelectTexts: IMultiSelectTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'menu item selected',
      checkedPlural: 'menu items selected',
      searchPlaceholder: 'Find menu item...',
      defaultTitle: 'Select menu items for user',
      allSelected: 'All selected',
  };
  public menuSelectOptions: IMultiSelectOption[] = [];
  edit: boolean;
  
  constructor(public fb:FormBuilder, 
              public toastrService: ToastrService,
              public translateService: TranslateService,
              public deviceService:DeviceService,
              public menuService:MenuService, 
              public modalService: NgbModal) {

    this.menuItems = this.menuService.getVerticalMenuItems();
    this.menuItems.forEach(item=>{
      let menu = { 
        id: item.id, 
        name: this.translateService.instant(item.title),
      }
      this.menuSelectOptions.push(menu);
    })
  }

  ngOnInit() {
    this.getDevices(); 
    this.form = this.fb.group({
       
        deviceId: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        description: [null, Validators.compose([Validators.required, Validators.minLength(6)])],       
        image: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  public getDevices(): void {
    this.deviceService.getDevices().subscribe( devices => 
      
      this.devices = devices._embedded.device
    );    
  }

  public addUser(user:User){
    this.deviceService.addUser(user).subscribe(user => {
      this.getDevices();      
    });
  }

  public updateUser(user:User){
    this.deviceService.updateUser(user).subscribe(user => {
      this.getDevices();      
    });
  }

  public deleteUser(user:User){
    this.deviceService.deleteUser(user.id).subscribe(result => 
      this.getDevices()
    );
  }

  public toggle(type){
    this.type = type;
  }

  public openMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.add('flipped');
        parent.parentNode.parentNode.classList.add('z-index-1');
        break;
      }
    }
  }

  public closeMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }

  public assignMenuItemsToUser(user){  
    this.updateUser(user);
    sessionStorage.setItem('userMenuItems', JSON.stringify(user.menuIds));
    this.toastrService.success('Please, logout and login to see result.', 'Successfully assigned !');
  }

  public openModal(modalContent, device) {
    if(device){
      this.edit=true;
      this.device = device;
      this.form.setValue(device);
   
    } 
    else{
      this.edit=false;
      this.device = new Device();
   
    }   
    this.modalRef = this.modalService.open(modalContent, { container: '.app' });
    
    this.modalRef.result.then((result) => {
      this.form.reset();
   
    }, (reason) => {
      this.form.reset();
     
    });
  }

  public closeModal(){
    this.modalRef.close();
  }

  public onSubmit(device:Device):void {
    if (this.form.valid) {
      if(this.edit){
        this.updateDevice(device);
      }
      else{
        this.addDevice(device);
      }      
      this.modalRef.close();    
    }
  } 
  addDevice(device: Device) {
    this.deviceService.addDevice(device).subscribe(device => {
      this.getDevices();      
    });
  }
  updateDevice(device: Device) {
    throw new Error('Method not implemented.');
  }

}

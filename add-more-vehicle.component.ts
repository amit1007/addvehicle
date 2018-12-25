import { Component, OnInit , NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import { SignupService } from '../../services/signup/signup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { MyprofileService } from '../../services/myprofile/myprofile.service';
import { interval } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser'
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-more-vehicle',
  templateUrl: './add-more-vehicle.component.html',
  styleUrls: ['./add-more-vehicle.component.css']
})
export class AddMoreVehicleComponent implements OnInit {
	veh_images:any
	addvehicleForm : FormGroup;
	submitted = false;
	is_v_tc : boolean = false;
	is_veh_tc : boolean = false;
	urls = new Array<string>();
	Files:string [] = [];
	FileName:string [] = [];

	myCarFiles:string [] = [];
	myCarFilesImgName:string [] = [];

	submitted1 :boolean= false;
	currentuser: any;
	loggedInUser : any;
	userid : number;
	operator_type : any;
	vehicleResponse:any;

  public totalfiles: Array<File> =[];
  public totalFileName = [];
  public lengthCheckToaddMore =0;



  constructor(private formBuilder : FormBuilder,public SignupService : SignupService, private route:ActivatedRoute,private router:Router,private alertService : AlertService,private myprofileService : MyprofileService,private toastr: ToastrService) { 
			
	}

  	ngOnInit() {

        this.veh_images = null;
	 	this.currentuser = localStorage.getItem('constantVariable.currentUser')
		if(this.currentuser)
		{
			this.loggedInUser = JSON.parse(this.currentuser);
			this.userid = this.loggedInUser.response.id;
			this.operator_type = this.loggedInUser.response.op_type_id;

			// get current user detail by his id
			/*
			this.myprofileService.getPersonalInfo(this.userid)
	        .pipe(first())
	        .subscribe(
	            data => {
	            	this.userData = data;
	            	console.log('user logged in data');
	            	console.log(this.userData);
	           //  	if(this.personalInfoResponse.response.status == 'success'){
	           //  		 this.alertService.success('Personal information saved successful', true);
	            		// this.router.navigate(['/myprofile']);
	           //  	}
	            },
	            error => {
	            	console.log('error');
	            	this.alertService.error('Something went wrong.');
	            	// this.alertService.error(error);
	            });
			*/
		}


		this.addvehicleForm = this.formBuilder.group({
		    itemRows: this.formBuilder.array([this.initVehicleItemRows()]),
		    veh_terms_condition:[''],
		    operator_type:this.formBuilder.control(this.operator_type),
		    veh_op_id : this.formBuilder.control(this.userid),
		});
	}

  	
	initVehicleItemRows() {
	    return this.formBuilder.group({
	        // list all your form controls here, which belongs to your form array
	        veh_wheel_type: [''],
	        veh_model: ['', [ Validators.required]],
	        veh_type: ['', [ Validators.required]],
	        veh_num1 : [''],
	        veh_num2 : [''],
	        veh_num3 : [''],
	        veh_num4 : [''],
	        veh_city: ['', [ Validators.required]],
	        veh_capacity: ['', [ Validators.required]],
	        veh_dimension: ['', [ Validators.required]],
	        veh_work_days_from:['', [ Validators.required]],
	        veh_work_days_to:['', [ Validators.required]],
	        veh_work_dt_from:['', [ Validators.required]],
	        veh_work_dt_to:['', [ Validators.required]],
	        // veh_images:[''],
	        veh_images : [''],
	        veh_registration_no:[''],
	    });
	}

			// veh_working_days: ['', [ Validators.required]],
	        // veh_working_from: ['', [ Validators.required]],
	        // veh_working_to: ['', [ Validators.required]],
	        // veh_images: [''],
	        // upload_pan: [''],
	        // upload_adhar: [''],
	        // upload_driving_licence: [''],
	        // veh_terms_condition : ['', [ ]],
	        // veh_op_id : this.formBuilder.control(this.userid),
	        // operator_type :this.formBuilder.control(this.operator_type),

    createForm(){
        this.addvehicleForm = this.formBuilder.group({
            itemRows: this.formBuilder.array([])
        });
        this.addvehicleForm.setControl('itemRows', this.formBuilder.array([]));
    }

    get itemRows(): FormArray {
        return this.addvehicleForm.get('itemRows') as FormArray;
    }

    addNewRow() {
        // control refers to your formarray
        const control = <FormArray>this.addvehicleForm.controls['itemRows'];
        // add new formgroup
        control.push(this.initVehicleItemRows());
    }

    deleteRow(index: number) {
        // control refers to your formarray
        const control = <FormArray>this.addvehicleForm.controls['itemRows'];
        // remove the chosen row
        control.removeAt(index);
    }

    changeVTCondition(value){
      console.log('check vehicle terms and condition');
      console.log(value);
      if(value==true){
        this.is_v_tc = true;
      }else{
        this.is_v_tc = false;
      }
    }

    check_veh_terms_condition(){
		console.log('clicked vehicle t&c');
		this.is_veh_tc = true;	
	}

	public fileSelectionEvent(e: any,oldIndex) {

		console.log("oldIndex is ", oldIndex);
		console.log('file input',e.target.files[0]);
		if (e.target.files && e.target.files.length > 0) {
			for (var i = 0; i < e.target.files.length; i++) { 
				var reader = new FileReader();
				reader.readAsDataURL(e.target.files[i]); // read file as data url
				reader.onload = (event:any) => { // called once readAsDataURL is completed
					// this.url = event.target.result;
					this.urls.push(event.target.result);
				}
				// this.totalfiles.push(e.target.files[i]);
				this.Files.push(e.target.files[i]);
				this.FileName.push(e.target.files[i].name);
				
				console.log('total files',this.totalfiles);
				console.log('total file name',this.FileName);
			}
		}

	}

	goBack(){
		this.router.navigate(['/myprofile']);
	}

	onSubmit(){
		this.submitted1 = true;
		console.log(this.addvehicleForm.value);
		
		if (this.addvehicleForm.invalid /* && this.is_v_tc==false */) {
			console.log('incorrect');
			return;
		}else{
			console.log('correct');
			this.addvehicleForm.value.veh_registration_no = this.addvehicleForm.value.veh_num1 + this.addvehicleForm.value.veh_num2 + this.addvehicleForm.value.veh_num3 + this.addvehicleForm.value.veh_num4;
			
			var vehicle_car_images = [];
			var vehicle_car_names = [];
			for (var i = 0; i < this.myCarFiles.length; i++) { 
			  vehicle_car_images.push(this.myCarFiles[i]);
			}
		    
			// this.addvehicleForm.value.vehicle_images = vehicle_car_images;
			this.addvehicleForm.value.veh_images =  this.myCarFilesImgName;
			console.log('cars names');

			this.myprofileService.saveVehicleInfo(this.addvehicleForm.value)
	        .pipe(first())
	        .subscribe(
	            data => {
	              this.vehicleResponse = data;
	              if(this.vehicleResponse.response.status == 'success'){
	               // this.alertService.success('Vehicle information saved successfully', true);
	               this.toastr.success('Vehicle information saved successfully.', 'Great!');
	              this.router.navigate(['/add-more-driver']);
	              }
	            },
	            error => {
	              console.log('error');
	              this.toastr.error('Something went wrong', 'Oops!');
	              // this.alertService.error('Something went wrong.');
	            });
		}
	}

}

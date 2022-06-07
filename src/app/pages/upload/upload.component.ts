import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadFileService]
})
export class UploadComponent implements OnInit {

  sub: any;
  id: string="";

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id ="" + params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  admincheck = false;
  status = false;

  constructor(private uploadService: UploadFileService, private route: ActivatedRoute,private toastr: ToastrService) { }
  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  change($event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.toastr.success('File Successfully Uploaded');
      }
      this.selectedFiles = undefined;
    }
    );
  }
  selectFile(event) {

   
    this.selectedFiles = event.target.files;
  }
  removeFile(): void {
    this.currentFileUpload = null;
  }
}

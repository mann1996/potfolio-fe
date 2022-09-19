import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ProfileModel } from '../model/profile.model';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { DataService } from '../service/data.service';
import { FileUploadService } from '../service/file-upload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  profileModel: ProfileModel;
  status: string = '';
  userId: string;
  imgSrc: string = '';
  selectedImage: any = null;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUpload: FileUploadService,
    private data: DataService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getUserProfile(this.userId).subscribe((response) => {
      if (response.valid) {
        this.profileModel = response;
        if (this.profileModel.thumbnail)
          this.imgSrc = this.profileModel.thumbnail;
        this.editProfileForm = this.fb.group({
          firstName: [this.profileModel.firstName, [Validators.required]],
          lastName: [this.profileModel.lastName],
          jobTitle: [this.profileModel.jobTitle],
          company: [this.profileModel.company],
          website: [this.profileModel.website, [Validators.pattern(reg)]],
          customSectionTitle: [this.profileModel.customSectionTitle],
          customSectionContent: [this.profileModel.customSectionContent],
          instagram: [this.profileModel.instagram],
          facebook: [this.profileModel.facebook],
          twitter: [this.profileModel.twitter],
          linkedin: [this.profileModel.linkedin],
          youtube: [this.profileModel.youtube],
          soundcloud: [this.profileModel.soundcloud],
          github: [this.profileModel.github],
        });

        this.saveValues();
      } else {
        console.log('error');
      }
    });
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      var filePath = `${'profile_thumbs'}/${
        this.userId
      }_${new Date().getTime()}`;
      this.status = 'Saving changes...';
      this.fileUpload.uploadFile(filePath, this.selectedImage).then((url) => {
        let data = [
          {
            op: 'replace',
            path: '/thumbnail',
            value: url,
          },
        ];
        this.userService.saveProfile(data, this.userId).subscribe((profile) => {
          this.status = 'Your changes have been saved';
          this.data.updateProfile(profile);
        });
      });
    } else {
      this.imgSrc = this.profileModel.thumbnail;
      this.selectedImage = null;
    }
  }

  saveValues() {
    for (const key in this.editProfileForm.controls) {
      let control: AbstractControl = this.editProfileForm.controls[key];
      control.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
        if (control.valid && control.dirty) {
          this.status = 'Saving changes...';
          let data = [
            {
              op: 'replace',
              path: '/' + key,
              value: value,
            },
          ];
          this.userService
            .saveProfile(data, this.userId)
            .subscribe((profile) => {
              this.status = 'Your changes have been saved';
              this.data.updateProfile(profile);
            });
        }
      });
    }
  }
}

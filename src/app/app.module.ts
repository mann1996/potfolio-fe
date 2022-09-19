import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faInfoCircle,
  faMapMarkerAlt,
  faThumbsUp,
  faEye,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faLinkedin,
  faGithubSquare,
  faYoutubeSquare,
  faSoundcloud,
  faFlickr,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { DiscoverComponent } from './discover/discover.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { RegisterComponent } from './register/register.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './service/user.service';
import { AuthGuard } from './Guards/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SearchComponent } from './search/search.component';
import { SearchPostComponent } from './search-post/search-post.component';
import { SearchPeopleComponent } from './search-people/search-people.component';
import { DataService } from './service/data.service';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { FileUploadService } from './service/file-upload.service';
import { PostComponent } from './post/post.component';
import { UrlSanitizerPipe } from './url-sanitizer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DiscoverComponent,
    LoginComponent,
    ProfileComponent,
    SubscriptionComponent,
    RegisterComponent,
    EditProfileComponent,
    SearchComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    PostEditorComponent,
    PostComponent,
    UrlSanitizerPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    FormBuilder,
    UserService,
    FileUploadService,
    DataService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faSearch,
      faInfoCircle,
      faMapMarkerAlt,
      faFacebookSquare,
      faTwitterSquare,
      faInstagramSquare,
      faLinkedin,
      faGithubSquare,
      faYoutubeSquare,
      faSoundcloud,
      faFlickr,
      faTelegram,
      faThumbsUp,
      faEye,
      faPlusSquare,
      faLock
    );
  }
}

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SigninProvider } from '../providers/signin/signin';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  profile: {};
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'IntroPage';
  loggedIn = false;
  pages: Array<{title: string, component: any}>;
 // Login page menu 
  loggedInPages = [
    { title: 'Dashboard', component: 'DashboardPage',icon:'home' },
    {title:'Practice', component:'PracticePage',icon:'paper'},
    {title:'Current Affairs', component:'CurrentAffairsPage',icon:'clipboard'},
    {title:'Logout Out', component:'LogOutPage',icon:'power'},
    {title:'Profile', component:'ProfilePage',icon:'home'}
  ];
  // Logout page menu 
  loggedOutPages = [
    {title: 'Dashboard', component: 'DashboardPage',icon:'home' },
    {title:'Practice', component:'PracticePage',icon:'paper'},
    {title:'Current Affairs', component:'CurrentAffairsPage',icon:'clipboard'},
    {title:'Sign Up', component:'SignupPage',icon:'home'},
    {title:'Sign in', component:'SigninPage',icon:'home'},
    {title:'Profile', component:'ProfilePage',icon:'home'},

  ];

  constructor(private service:SigninProvider,private nativeStorage: NativeStorage,private socialSharing: SocialSharing,private events: Events,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
  
    this.initializeApp();
    /*this.service.getData().then(data=>{
      alert(data);
    });*/
    this.service.getData().then(data=>{
      if(Object.keys(data).length){
        this.loggedIn = true;
      }
    });
     this.listenToLoginEvents();
  }
 
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openHelp(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
    this.events.subscribe('user:profile',()=> {
      this.service.getData().then(data=>{
        this.profile = data;
      });
    })
  }

  shareInfo(){
      this.socialSharing.share("demo message", "Demo subject", "", "https://ampersandacademy.com").
      then(() => {
        console.log("Sharing success");
        // Success!
        }).catch(() => {
        // Error!
        console.log("Share failed");
        });
  }
  
  
}

import { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'com.atilamagalhaes4',
  appName: 'Oxe, me respeite !', 
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    SplashScreen: {
      launchShowDuration: 4000,
      launchAutoHide: true,
      backgroundColor: "#f49c21",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#f49c21",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: false,
    },
    Keyboard:{
      resizeOnFullScreen:true
    },
    LocalNotifications: {
      "smallIcon": "icone_pequeno",
      "iconColor": "#339967"
    }
  },
};

export default config;

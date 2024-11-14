const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const ANDROID_BUILD_PATH = 'android/app/build/outputs/apk/release/app-release.apk';
const IOS_BUILD_PATH = 'ios/build/YourApp.xcarchive';

const deployToStore = async (platform) => {
  try {
    if (platform === 'android') {
      // Deploy to Google Play Store
      console.log('Deploying to Google Play Store...');
      await executeCommand(`
        fastlane android deploy
        track: production
        json_key: ${process.env.GOOGLE_PLAY_JSON_KEY}
        apk: ${ANDROID_BUILD_PATH}
      `);
    } else if (platform === 'ios') {
      // Deploy to App Store
      console.log('Deploying to App Store...');
      await executeCommand(`
        fastlane ios deploy
        api_key: ${process.env.APPSTORE_API_KEY}
        archive_path: ${IOS_BUILD_PATH}
      `);
    }
    
    console.log(`Successfully deployed to ${platform} store!`);
  } catch (error) {
    console.error(`Error deploying to ${platform} store:`, error);
    process.exit(1);
  }
};

const executeCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
};

// Run deployment
const platform = process.argv[2];
if (!platform || !['android', 'ios'].includes(platform)) {
  console.error('Please specify platform: android or ios');
  process.exit(1);
}

deployToStore(platform); 
describe('App Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show login screen on first launch', async () => {
    await expect(element(by.id('login-screen'))).toBeVisible();
  });

  it('should navigate to home after login', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    await expect(element(by.id('home-screen'))).toBeVisible();
  });

  it('should show product details when product is tapped', async () => {
    await element(by.id('product-card-1')).tap();
    await expect(element(by.id('product-details-screen'))).toBeVisible();
  });
}); 
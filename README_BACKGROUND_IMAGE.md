# Background Image Setup

To add the Buddha statue background image:

1. **Save the image file** as `buddha-statue-background.jpg` in the same folder as `mobile_app_web.html`

2. **Or use an online URL:**
   - If you have the image hosted online, update line 18 in `mobile_app_web.html`:
   ```css
   url('YOUR_IMAGE_URL_HERE');
   ```

3. **Alternative:** If you want to use a different filename, update the CSS:
   ```css
   url('your-image-filename.jpg');
   ```

The background is set with:
- Semi-transparent orange gradient overlay (70% opacity)
- Fixed attachment (stays in place when scrolling)
- Cover sizing (fills entire background)
- Center positioning

The app container has a semi-transparent white background (98% opacity) so the Buddha image shows through subtly.


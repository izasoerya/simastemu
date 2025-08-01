# Migration Flow

1. **Build the app**  
   Make sure migrations can access compiled files:

   ```bash
   npm run build
   ```

2. **Generate migration**  
   Compares dev DB schema vs entities:

   ```bash
   npm run migration:generate
   ```

3. **Rebuild the app**  
   Include the new migration file:

   ```bash
   npm run build
   ```

4. **Apply migration to dev DB**
   ```bash
   npm run migration:run:dev
   ```

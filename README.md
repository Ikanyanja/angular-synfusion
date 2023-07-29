# Graphql


Running the app
```shell
   ng serve --host 0.0.0.0 --port 4200 -o --disable-host-check
```


Installing the plugin
```shell
    npm install @syncfusion/ej2-data --save
```
Install Jest 
```shell
   npm install jest @types/jest jest-preset-angular ts-jest --save-dev
```

Then, update your tsconfig.spec.json file to include the necessary settings for Jest:

 ```
    {
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "outDir": "./out-tsc/spec",
        "types": ["jest", "node"]
    },
    "files": ["src/polyfills.ts"],
    "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
    }
```
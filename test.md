**_Structure_**
Components: These are reusable, presentational components that don’t manage their own state.
Containers: These are stateful components that fetch data, manage state, and handle logic. They can also be called "smart" components.
Pages: These represent complete views or screens, usually corresponding to routes in your application.

페이지 (페이지에서는 조합해서 뿌려준다.)

치다만 코드
주석 처리하고
위에다가 // 날짜 + 작업중

// E.g. 2024.05.15 useEffect내 함수 작업중.

#### Best Practices

- Modularization: Keep related files together. This makes it easier to find and maintain code.
- Separation of Concerns: Separate presentational and container logic. Presentational components should not contain business logic.
- Testing: Include tests alongside your components and containers. This encourages testing and makes it easier to find tests related to a specific component.
- Styling: Use CSS modules or styled-components to scope styles locally to the component, avoiding global style conflicts.
- Barrel Files: Use index.ts files to re-export modules for cleaner and more manageable imports.

#### Benefits of Separate Hooks/Components/Utils for Each Container

1. Modularity: Encapsulates functionality specific to a container, making the codebase more manageable and understandable.
2. Separation of Concerns: Keeps the business logic (hooks and utils) separate from the presentation logic (components).
3. Maintainability: Changes in a container's logic or layout are isolated, reducing the risk of unintended side effects on other parts of the application.
4. Reusability: Smaller components and hooks can be more easily reused within the same container or across different containers if designed generically.

#### Considerations and Best Practices

1. Avoid Duplication: If you notice that multiple containers need the same functionality, it's better to extract this functionality into a shared module rather than duplicating it. This promotes DRY (Don't Repeat Yourself) principles.
2. Balance Specificity and Reusability: While container-specific hooks and components are useful, always consider if the logic or UI can be abstracted and reused elsewhere. If so, place these in a shared directory.
3. Scalability: As your application grows, having a clear and organized structure helps in scaling the codebase efficiently.

### Example of The File Structure

src/
│
├── components/
│ ├── Button/
│ │ ├── Button.tsx
│ │ ├── Button.test.tsx
│ │ ├── Button.module.css
│ │ ├── index.ts
│ │
│ └── ...
│
├── containers/
│ ├── PostsContainer/
│ │ ├── PostsContainer.tsx
│ │ ├── PostsContainer.test.tsx
│ │ ├── PostsContainer.module.css
│ │ ├── hooks/
│ │ │ ├── usePosts.ts
│ │ ├── components/
│ │ │ ├── PostItem.tsx
│ │ │ ├── PostList.tsx
│ │ ├── utils/
│ │ │ ├── fetchPosts.ts
│ │ ├── index.ts
│ │
│ └── ...
│
├── features/
│ ├── posts/
│ │ ├── postsSlice.ts
│ │ ├── postsThunks.ts
│ │ ├── postsSelectors.ts
│ │ ├── index.ts
│ │
│ └── ...
│
├── hooks/
│ ├── useFetch.ts
│ ├── useAuth.ts
│ └── ...
│
├── utils/
│ ├── api.ts
│ ├── helpers.ts
│ └── ...
│
├── types/
│ ├── types.ts
│
└── index.tsx

**_컴포넌트 라이브러리_**
Material UI

https://mui.com/material-ui/

폰트
한글
Pretendard
https://noonnu.cc/font_page/694
영문
Roboto
https://fonts.google.com/specimen/Roboto

Api 문서정의

https://swagger.io/

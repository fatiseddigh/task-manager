# Task Manager – React Query Practice Project

A task management application built to practice advanced React Query patterns and state synchronization techniques.

This project focuses on understanding server state management, optimistic updates, and error handling in a controlled environment using a mocked API.

---

## Tech Stack

* React + TypeScript (strict mode)
* @tanstack/react-query
* Redux (basic store setup)
* Axios
* MSW (Mock Service Worker)
* TailwindCSS
* react-error-boundary

---

## What Is Implemented

### Server State Management

* Data fetching using `useQuery`
* Mock API using MSW
* Simulated network delay and random server errors

### Optimistic Updates

* Optimistic task creation with rollback on failure
* Optimistic delete with rollback support
* Optimistic toggle (complete/incomplete) with error recovery
* Inline editing with optimistic update
* Manual cache updates using `setQueryData`
* Query cancellation before mutation

### Error Handling

* Global `AppErrorBoundary`
* Integration with React Query using `throwOnError`
* Safe TypeScript handling of `unknown` errors

---

## Project Goals

The goal of this project was to:

* Understand how React Query manages server state
* Practice cache manipulation and synchronization
* Learn how optimistic updates work internally
* Handle async failures safely
* Work with strict TypeScript settings

This project is primarily a learning-focused implementation.

---

## Running the Project

```bash
npm install
npm run dev
```

MSW runs locally to mock backend behavior.

---

## Possible Improvements

* Infinite scroll with `useInfiniteQuery`
* Improved loading UX (skeleton states)
* Better separation of error boundaries
* Automated testing (React Testing Library + MSW)
* Replace mock API with a real backend

---

## Notes

This is not intended to be a production-ready app.
It is a focused practice project to deepen understanding of React Query and async UI patterns.

import { publicProcedure, router } from './trpc';
import { dashboardRouter } from './routers/dashboardRouter';
 
export const appRouter = router({
  dashboards: dashboardRouter,
});
 
export type AppRouter = typeof appRouter;
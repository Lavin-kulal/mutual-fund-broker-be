import cron from "node-cron";
import { ClientService } from "../../Components/Clients/clients.service";
export function cronScheduler() {
  cron.schedule("0 * * * *", () => {
    new ClientService().updateAllPortfolios();
  });
}

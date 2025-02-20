import Funds from "./funds.model";

export class FundService {
  async getPaginatedFund(pageNum, sort, limit) {
    const matchQuery = {};
    const totalFunds = await Funds.getTotalFundCount(matchQuery);
    const funds = await Funds.getFundDataByPagination(
      Number(pageNum),
      Number(limit),
      Number(sort)
    );
    const totalPages =
      funds.length <= Number(limit) - 1
        ? Number(totalFunds)
        : (Number(pageNum) + 1) * Number(limit);

    return {
      funds: funds,
      totalPages: totalPages,
      total: totalFunds,
    };
  }
}

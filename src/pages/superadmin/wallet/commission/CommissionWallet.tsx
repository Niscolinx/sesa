import { useState } from "react";
import Table from "../../../../components/ui/table/Table";
import CommissionDialog from "./CommissionDialog";

const CommissionWallet = () => {
	return (
		<div className="grid mt-12 pb-10 rounded-lg  items-baseline gap-10">
			<CommissionDialog />
			<div className="rounded-lg mt-[3rem] min-h-[60vh]">
				<Table
					fetch_url={"/admin/get/wallet/transaction/commission"}
					view_page_url={"/superAdmin/wallet/commission/"}
					title={"commission_history"}
					isStrictAction
					actions={["view details"]}
					THeader={[
						"transaction_ID",
						"amount",
						"type",
						"status",
						"date/time",
						"actions",
					]}
					data_to_display={[
						"tran_id",
						"amount",
						"type",
						"status",
						"created_at",
					]}
				/>
			</div>
		</div>
	);
};

export default CommissionWallet;

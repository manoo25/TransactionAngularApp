export interface Itransactions {
  id: string;        
  date: string;       
  voucherNo: string;  
  accountId: string;  
  accountName: string; 
  branch: string;      
  type: "Debit" | "Credit"; 
  amount: number;
}

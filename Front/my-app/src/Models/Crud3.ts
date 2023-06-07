export interface Journal {
    id: number;
    strategy: string;
    buyprice: number;
    sellprice: number;
    position: string;
    description: string;
    image?: File | undefined;
    user_id: number;
  }
  
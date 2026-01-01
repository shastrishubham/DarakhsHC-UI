import { ItemTypes } from "./ItemTypes";

export class ItemInfo {
    public Id: number;
    public FormDate: any;
    public MS_Comp_Id: number;
    public MS_ItemComp_Id: number;
    public CompanyName: string;
    public Name: string;
    public Description: string;
    public OtherInfo: string;
    public MRP: number;
    public PRate: number;
    public PRateEffectiveFrom: any;
    public SRate: number;
    public MS_TaxRate_Id: number;
    public TaxRateName: string;
    public SerialNo: string;
    public ItemType: ItemTypes;
    public HsnCode: string;
    public MinimumStock: number;
    public TotalStock: number;
    public AvailableStock: number;
    public MS_WH_Id: number;
    public WarehouseName: string;
}
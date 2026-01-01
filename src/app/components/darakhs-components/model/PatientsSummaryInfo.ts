import { PatientInventoryInfo } from "./PatientInventoryInfo";

export class PatientsSummaryInfo {
    public Id: number;
    public MS_Comp_Id: number;
    public FormDate: any;
    public ReceiptNo: string;
    public MS_Patients_Id: number;
    public PatientsName: string;
    public Mobile: string;
    public MS_Treament_Id: number;
    public TreamentName: string;
    public AddressLine1: string;
    public AddressLine2: string;
    public PostalCode: number;
    public MS_State_Id: number;
    public StateName: string;
    public MS_City_Id: number;
    public CityName: string;
    public VisitDate: any;
    public Remark: string;
    public Notes: string;
    public NextVisitDate: any;

    public IsFollowUpReq: false;
    public FollowUpDate?: string | null;

    public MS_Reference_Id: number;
    public Reference: string;
}
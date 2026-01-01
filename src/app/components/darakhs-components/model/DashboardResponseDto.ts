export class DashboardResponseDto {
    public Kpis: DashboardKpiDto
    public HourlyAppointments: HourlyAppointmentDto[];
    public MonthlyStats: MonthlyStatsDto[];
    public AppointmentVsWalkin: DonutChartDto[];
    public TreatmentsMonthlyStatsDto: TreatmentsMonthlyStatsDto[];
    public TreatmentsDonutChartDto: TreatmentsDonutChartDto[];

}

export class DashboardKpiDto {
    public TodaysAppointmentCount: number;
    public TodaysPatientCount: number
    public ThisMonthPatientCount: number;
    public TodaysFollowUpCount: number;
    public TodaysSummaryCount: number;
}

export class HourlyAppointmentDto {
    public HourSlot: string;
    public PatientCount: number;
}

export class MonthlyStatsDto {
    public MonthName: string;
    public MonthNumber: number;
    public YearNumber: number;
    public PatientCount: number;
    public AppointmentCount: number;
}

export class DonutChartDto {
    public PatientType: string;
    public PatientCount: number;
}

export class TreatmentsMonthlyStatsDto {
    public MonthName: string;
    public MonthNumber: number;
    public YearNumber: number;
    public HearingCount: number;
    public SpeakingCount: number;
}

export class TreatmentsDonutChartDto {
    public TreatmentType: string;
    public TreatmentCount: number;
}
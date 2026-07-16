using System;

namespace Server.Models.Dtos
{
    public class RcaDetailDto
    {
        public long RcaId { get; set; }
        public long RcaSourceId { get; set; }
        public DateTime? RcaDate { get; set; } // Added missing property
        public string? RcaCode { get; set; }
        public string? RcaDetailsText { get; set; }
        public string? ResponsibleDept { get; set; }
        public string? RcaSeverity { get; set; }
        public DateTime? RcaTargetDate { get; set; }
        public long? RcaApprovedUser { get; set; } // Added missing property
        public DateTime? RcaClosedDate { get; set; } // Added missing property
        public DateTime LastUpdateDate { get; set; } // Added missing property
    }

    public class CreateRcaDto
    {
        public long RcaId { get; set; }
        public long RcaSourceId { get; set; }
        public DateTime? RcaDate { get; set; } // Added missing property
        public string? RcaCode { get; set; }
        public string? RcaDetailsText { get; set; }
        public string? ResponsibleDept { get; set; }
        public string? RcaSeverity { get; set; }
        public DateTime? RcaTargetDate { get; set; } // Added missing property
        public long? RcaApprovedUser { get; set; } // Added missing property
        public DateTime? RcaClosedDate { get; set; } // Added missing property
    }

    public class UpdateRcaDto // Created missing Update DTO mapping class
    {
        public long RcaSourceId { get; set; }
        public DateTime? RcaDate { get; set; }
        public string? RcaCode { get; set; }
        public string? RcaDetailsText { get; set; }
        public string? ResponsibleDept { get; set; }
        public string? RcaSeverity { get; set; }
        public DateTime? RcaTargetDate { get; set; }
        public long? RcaApprovedUser { get; set; }
        public DateTime? RcaClosedDate { get; set; }
    }
}

using System;

namespace Server.Models.Dtos
{
    public class CapaDetailDto
    {
        public long CapaId { get; set; }
        public long RcaId { get; set; }
        public DateTime? CapaDate { get; set; } // Added missing property
        public string? RootCause { get; set; }
        public string? CorrectiveDetails { get; set; }
        public string? PreventiveDetails { get; set; }
        public string? CapaRemarks { get; set; }
        public string? CapaAttachment { get; set; } // Added missing property
        public DateTime LastUpdateDate { get; set; } // Added missing property
    }

    public class CreateCapaDto
    {
        public long CapaId { get; set; }
        public long RcaId { get; set; }
        public DateTime? CapaDate { get; set; } // Added missing property
        public string? RootCause { get; set; }
        public string? CorrectiveDetails { get; set; }
        public string? PreventiveDetails { get; set; }
        public string? CapaRemarks { get; set; } // Added missing property
        public string? CapaAttachment { get; set; } // Added missing property
    }

    public class UpdateCapaDto // Created missing Update DTO mapping class
    {
        public long RcaId { get; set; }
        public DateTime? CapaDate { get; set; }
        public string? RootCause { get; set; }
        public string? CorrectiveDetails { get; set; }
        public string? PreventiveDetails { get; set; }
        public string? CapaRemarks { get; set; }
        public string? CapaAttachment { get; set; }
    }
}

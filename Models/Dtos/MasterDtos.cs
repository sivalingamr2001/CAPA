namespace Server.Models.Dtos
{
    public class RcaSourceMasterDto
    {
        public long SourceId { get; set; }
        public string SourceName { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public DateTime? InactiveDate { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CreateMasterDto
    {
        public long SourceId { get; set; }
        public string SourceName { get; set; } = null!;
        public long CreatedBy { get; set; }
    }

    public class UpdateMasterDto
    {
        public string SourceName { get; set; } = null!;
        public DateTime? InactiveDate { get; set; }
    }

    public class RcaSourceDetailDto
    {
        public long SourceId { get; set; }
        public long RcaSourceId { get; set; }
        public string RcaSource { get; set; } = null!;
        public string RcaCode { get; set; } = null!;
        public string? RcaDescription { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public long RcaLiveFlag { get; set; }
        public DateTime? RcaInactiveDate { get; set; }
    }

    public class CreateSourceDetailDto
    {
        public long SourceId { get; set; }
        public long RcaSourceId { get; set; }
        public string RcaSource { get; set; } = null!;
        public string RcaCode { get; set; } = null!;
        public string? RcaDescription { get; set; }
        public long CreatedBy { get; set; }
        public long RcaLiveFlag { get; set; }
    }

    public class UpdateSourceDetailDto
    {
        public long SourceId { get; set; }
        public string RcaSource { get; set; } = null!;
        public string RcaCode { get; set; } = null!;
        public string? RcaDescription { get; set; }
        public long RcaLiveFlag { get; set; }
        public DateTime? RcaInactiveDate { get; set; }
    }
}

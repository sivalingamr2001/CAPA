using Server.Models.Common;

namespace Server.Models;

public class JanRcaDetail
{
    public long RcaSourceId { get; set; }
    public long RcaId { get; set; }
    public DateTime? RcaDate { get; set; }
    public string? RcaCode { get; set; }
    public string? RcaDetailsText { get; set; }
    public string? ResponsibleDept { get; set; }
    public string? RcaSeverity { get; set; }
    public DateTime? RcaTargetDate { get; set; }
    public long? RcaApprovedUser { get; set; }
    public DateTime? RcaClosedDate { get; set; }
    public DateTime LastUpdateDate { get; set; }

    public virtual JanRcaSourceDetail SourceDetail { get; set; } = null!;
    public virtual ICollection<JanCapaDetail> CapaDetails { get; set; } = new List<JanCapaDetail>();
}

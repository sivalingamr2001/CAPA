using Server.Models.Common;

namespace Server.Models;

public class JanCapaDetail
{
    public long RcaId { get; set; }
    public long CapaId { get; set; }
    public DateTime? CapaDate { get; set; }
    public string? RootCause { get; set; }
    public string? CorrectiveDetails { get; set; }
    public string? PreventiveDetails { get; set; }
    public string? CapaRemarks { get; set; }
    public string? CapaAttachment { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public virtual JanRcaDetail RcaDetail { get; set; } = null!;
}

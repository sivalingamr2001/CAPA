using Server.Models.Common;

namespace Server.Models;

public class JanRcaSourceDetail : ITrackableEntity
{
    public long SourceId { get; set; }
    public long RcaSourceId { get; set; }
    public string RcaSource { get; set; } = null!;
    public string RcaCode { get; set; } = null!;
    public string? RcaDescription { get; set; }
    public long CreatedBy { get; set; }
    public DateTime? CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public long RcaLiveFlag { get; set; }
    public DateTime? RcaInactiveDate { get; set; }

    public virtual JanRcaSourceMaster SourceMaster { get; set; } = null!;
    public virtual ICollection<JanRcaDetail> RcaDetails { get; set; } = new List<JanRcaDetail>();
}

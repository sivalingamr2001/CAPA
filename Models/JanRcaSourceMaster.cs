using Server.Models.Common;

namespace Server.Models;

public class JanRcaSourceMaster : ITrackableEntity
{
    public long SourceId { get; set; }
    public string SourceName { get; set; } = null!;
    public DateTime? CreationDate { get; set; }
    public DateTime LastUpdateDate { get; set; }
    public DateTime? InactiveDate { get; set; }
    public long CreatedBy { get; set; }

    public virtual ICollection<JanRcaSourceDetail> SourceDetails { get; set; } = new List<JanRcaSourceDetail>();
}

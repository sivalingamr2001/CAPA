namespace Server.Models.Common;

public interface ITrackableEntity
{
    DateTime? CreationDate { get; set; }
    DateTime LastUpdateDate { get; set; }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.Data.Configurations;

public class JanRcaSourceMasterConfiguration : IEntityTypeConfiguration<JanRcaSourceMaster>
{
    public void Configure(EntityTypeBuilder<JanRcaSourceMaster> builder)
    {
        builder.ToTable("JAN_RCA_SOURCE_MASTER");
        builder.HasKey(e => e.SourceId);

        builder.Property(e => e.SourceId).HasColumnName("SOURCE_ID");
        builder.Property(e => e.SourceName).HasColumnName("SOURCE_NAME").HasMaxLength(30).IsRequired();
        builder.Property(e => e.CreationDate).HasColumnName("CREATION_DATE").IsRequired();
        builder.Property(e => e.LastUpdateDate).HasColumnName("LAST_UPDATE_DATE").IsRequired();
        builder.Property(e => e.InactiveDate).HasColumnName("INACTIVE_DATE");
        builder.Property(e => e.CreatedBy).HasColumnName("CREATED_BY").IsRequired();
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.Data.Configurations;

public class JanRcaSourceDetailConfiguration : IEntityTypeConfiguration<JanRcaSourceDetail>
{
    public void Configure(EntityTypeBuilder<JanRcaSourceDetail> builder)
    {
        builder.ToTable("JAN_RCA_SOURCE_DETAILS");
        builder.HasKey(e => e.RcaSourceId);

        builder.Property(e => e.SourceId).HasColumnName("SOURCE_ID");
        builder.Property(e => e.RcaSourceId).HasColumnName("RCA_SOURCE_ID");
        builder.Property(e => e.RcaSource).HasColumnName("RCA_SOURCE").HasMaxLength(30).IsRequired();
        builder.Property(e => e.RcaCode).HasColumnName("RCA_CODE").HasMaxLength(50);
        builder.Property(e => e.RcaDescription).HasColumnName("RCA_DESCRIPTION").HasMaxLength(200);
        builder.Property(e => e.CreatedBy).HasColumnName("CREATED_BY");
        builder.Property(e => e.CreationDate).HasColumnName("CREATION_DATE");
        builder.Property(e => e.LastUpdateDate).HasColumnName("LAST_UPDATE_DATE");
        builder.Property(e => e.RcaLiveFlag).HasColumnName("RCA_LIVE_FLAG");
        builder.Property(e => e.RcaInactiveDate).HasColumnName("RCA_INACTIVE_DATE");

        builder.HasOne(d => d.SourceMaster)
              .WithMany(p => p.SourceDetails)
              .HasForeignKey(d => d.SourceId)
              .OnDelete(DeleteBehavior.Restrict);
    }
}

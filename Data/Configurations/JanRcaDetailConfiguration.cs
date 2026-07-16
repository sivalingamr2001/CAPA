using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.Data.Configurations;

public class JanRcaDetailConfiguration : IEntityTypeConfiguration<JanRcaDetail>
{
    public void Configure(EntityTypeBuilder<JanRcaDetail> builder)
    {
        builder.ToTable("JAN_RCA_DETAILS");
        builder.HasKey(e => e.RcaId);

        builder.Property(e => e.RcaSourceId).HasColumnName("RCA_SOURCE_ID");
        builder.Property(e => e.RcaId).HasColumnName("RCA_ID");
        builder.Property(e => e.RcaDate).HasColumnName("RCA_DATE");
        builder.Property(e => e.RcaCode).HasColumnName("RCA_CODE").HasMaxLength(50);
        builder.Property(e => e.RcaDetailsText).HasColumnName("RCA_DETAILS").HasMaxLength(200);
        builder.Property(e => e.ResponsibleDept).HasColumnName("RESPONSIBLE_DEPT").HasMaxLength(20);
        builder.Property(e => e.RcaSeverity).HasColumnName("RCA_SEVERITY").HasMaxLength(10);
        builder.Property(e => e.RcaTargetDate).HasColumnName("RCA_TARGET_DATE");
        builder.Property(e => e.RcaApprovedUser).HasColumnName("RCA_APPROVED_USER");
        builder.Property(e => e.RcaClosedDate).HasColumnName("RCA_CLOSED_DATE");
        builder.Property(e => e.LastUpdateDate).HasColumnName("LAST_UPDATE_DATE");

        builder.HasOne(d => d.SourceDetail)
              .WithMany(p => p.RcaDetails)
              .HasForeignKey(d => d.RcaSourceId)
              .OnDelete(DeleteBehavior.Restrict);
    }
}

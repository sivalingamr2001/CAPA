using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Models;

namespace Server.Data.Configurations;

public class JanCapaDetailConfiguration : IEntityTypeConfiguration<JanCapaDetail>
{
    public void Configure(EntityTypeBuilder<JanCapaDetail> builder)
    {
        builder.ToTable("JAN_CAPA_DETAILS");
        builder.HasKey(e => e.CapaId);

        builder.Property(e => e.RcaId).HasColumnName("RCA_ID");
        builder.Property(e => e.CapaId).HasColumnName("CAPA_ID");
        builder.Property(e => e.CapaDate).HasColumnName("CAPA_DATE");
        builder.Property(e => e.RootCause).HasColumnName("ROOT_CAUSE").HasMaxLength(200);
        builder.Property(e => e.CorrectiveDetails).HasColumnName("CORRECTIVE_DETAILS").HasMaxLength(200);
        builder.Property(e => e.PreventiveDetails).HasColumnName("PREVENTIVE_DETAILS").HasMaxLength(200);
        builder.Property(e => e.CapaRemarks).HasColumnName("CAPA_REMARKS").HasMaxLength(200);
        builder.Property(e => e.CapaAttachment).HasColumnName("CAPA_ATTACHMENT").HasMaxLength(200);
        builder.Property(e => e.LastUpdateDate).HasColumnName("LAST_UPDATE_DATE");

        builder.HasOne(d => d.RcaDetail)
              .WithMany(p => p.CapaDetails)
              .HasForeignKey(d => d.RcaId)
              .OnDelete(DeleteBehavior.Restrict);
    }
}

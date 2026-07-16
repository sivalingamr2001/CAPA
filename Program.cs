using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Server.Data.ExternalSources;
using Server.Data.Repositories;
using Server.Services;

namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddScoped<OracleService>();

            builder.Services.AddDbContext<AppDbContext>((serviceProvider, options) =>
            {
                var oracleService = serviceProvider.GetRequiredService<OracleService>();
                string connectionString = oracleService.GetConnectionString();

                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("Oracle connection string could not be extracted from configurations.");
                }

                options.UseOracle(connectionString);
            });

            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

            builder.Services.AddScoped<IMasterService, MasterService>();
            builder.Services.AddScoped<IRcaService, RcaService>();
            builder.Services.AddScoped<ICapaService, CapaService>();

            builder.Services.AddControllers();
            builder.Services.AddOpenApi();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();

                app.MapScalarApiReference(options =>
                {
                    options.WithTitle("RCA & CAPA Quality Management API Hub")
                           .WithTheme(ScalarTheme.DeepSpace)
                           .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

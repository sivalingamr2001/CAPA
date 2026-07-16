using ConnectionDll;

namespace Server.Data.ExternalSources;

public class OracleService
{
    public string GetConnectionString()
    {
        var provider = new Class1();
        return provider.oracon.ConnectionString;
    }

}

using Microsoft.EntityFrameworkCore;
using lumos_workspace.Models;

namespace lumos_workspace.Data
{
    public class WorkspaceContext : DbContext
    {
        public WorkspaceContext(DbContextOptions<WorkspaceContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }
    }
}

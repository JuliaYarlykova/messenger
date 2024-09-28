﻿// <auto-generated />
using System;
using Messenger_Enter_Text.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Messenger_Enter_Text.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20240927092102_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ChatUser", b =>
                {
                    b.Property<int>("ChatsId")
                        .HasColumnType("int");

                    b.Property<int>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("ChatsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("ChatUser");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.Chat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Is_Private")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.Complaint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<long>("MId")
                        .HasColumnType("bigint");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("UId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MId");

                    b.HasIndex("UId");

                    b.ToTable("Complaints");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.Message", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<int>("ChatId")
                        .HasColumnType("int");

                    b.Property<int>("SenderId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ChatId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Config")
                        .IsRequired()
                        .HasMaxLength(2000)
                        .HasColumnType("nvarchar(2000)");

                    b.Property<DateTime>("HadBeen")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsEmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("IsFrozen")
                        .HasColumnType("bit");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<string>("UserEmail")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("UserEmail")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.UserProfile", b =>
                {
                    b.Property<int>("UId")
                        .HasColumnType("int");

                    b.Property<string>("About")
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<DateOnly?>("Birthday")
                        .HasColumnType("date");

                    b.Property<string>("ImagePath")
                        .HasMaxLength(260)
                        .HasColumnType("nvarchar(260)");

                    b.Property<string>("Nickname")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("UId");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.Property<int>("FriendsId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FriendsId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserUser");
                });

            modelBuilder.Entity("UserUser1", b =>
                {
                    b.Property<int>("BlackListId")
                        .HasColumnType("int");

                    b.Property<int>("User1Id")
                        .HasColumnType("int");

                    b.HasKey("BlackListId", "User1Id");

                    b.HasIndex("User1Id");

                    b.ToTable("UserUser1");
                });

            modelBuilder.Entity("UserUser2", b =>
                {
                    b.Property<int>("FriendsPendingId")
                        .HasColumnType("int");

                    b.Property<int>("User2Id")
                        .HasColumnType("int");

                    b.HasKey("FriendsPendingId", "User2Id");

                    b.HasIndex("User2Id");

                    b.ToTable("UserUser2");
                });

            modelBuilder.Entity("ChatUser", b =>
                {
                    b.HasOne("Messenger_Enter_Text.Entities.Chat", null)
                        .WithMany()
                        .HasForeignKey("ChatsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Messenger_Enter_Text.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.Complaint", b =>
                {
                    b.HasOne("Messenger_Enter_Text.Entities.Message", "Message")
                        .WithMany("Complaints")
                        .HasForeignKey("MId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Messenger_Enter_Text.Entities.User", "Suspect")
                        .WithMany("Complaints")
                        .HasForeignKey("UId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Message");

                    b.Navigation("Suspect");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.Message", b =>
                {
                    b.HasOne("Messenger_Enter_Text.Entities.Chat", "Chat")
                        .WithMany("Messages")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Messenger_Enter_Text.Entities.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.UserProfile", b =>
                {
                    b.HasOne("Messenger_Enter_Text.Entities.User", "User")
                        .WithOne("UserProfile")
                        .HasForeignKey("Messenger_Enter_Text.Entities.UserProfile", "UId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.HasOne("Messenger_Enter_Text.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("FriendsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Messenger_Enter_Text.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();
                });

            modelBuilder.Entity("UserUser1", b =>
                {
                    b.HasOne("Messenger_Enter_Text.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("BlackListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Messenger_Enter_Text.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("User1Id")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();
                });

            modelBuilder.Entity("UserUser2", b =>
                {
                    b.HasOne("Messenger_Enter_Text.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("FriendsPendingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Messenger_Enter_Text.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("User2Id")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.Chat", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.Message", b =>
                {
                    b.Navigation("Complaints");
                });

            modelBuilder.Entity("Messenger_Enter_Text.Entities.User", b =>
                {
                    b.Navigation("Complaints");

                    b.Navigation("Messages");

                    b.Navigation("UserProfile")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(

    operations: [
        new Get(
        ),
        new Post(),
        new Put(),
        new Delete(),
        new GetCollection()
    ],
    normalizationContext: [
    'groups' => ['invoice:read']
],
    order: ['sentAt' => 'desc'],
    paginationEnabled: true,
    paginationItemsPerPage: 20

)]
#[ApiFilter(
    OrderFilter::class
)]
#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["invoice:read", "customer:read"])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["invoice:read", "customer:read"])]
    private ?float $amount = null;

    #[ORM\Column]
    #[Groups(["invoice:read", "customer:read"])]
    private ?\DateTime $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(["invoice:read", "customer:read"])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["invoice:read"])]
    private ?Customer $customer = null;

    #[ORM\Column]
    #[Groups(["invoice:read", "customer:read"])]
    private ?int $chrono = null;

    /**
     * Permet de récupérer le User pour cette facture
     * @return User
     */
    #[Groups(["invoice:read"])]
    public function getUser(): User {
        return $this->getCustomer()->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTime
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTime $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}

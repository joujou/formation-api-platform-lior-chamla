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
use App\Controller\InvoiceIncrementationController;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(),
        new Post(),
        new Put(),
        new Delete(),
        new GetCollection(),
        new Post(
            uriTemplate: '/invoices/{id}/increment',
            controller: InvoiceIncrementationController::class,
            openapiContext: [
                'summary' => 'Incrémentation chrono invoice',
            ],
            name: 'Invoice Increment'

        ),
    ],
    normalizationContext: [
        'groups' => ['invoice:read']
    ],
    denormalizationContext: ['disable_type_enforcement' => true],
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
    #[Assert\NotBlank(message: "Valeur obligatoire")]
    #[Assert\Type(type: "numeric", message: "Valeur numérique attendue")]
    private $amount = null;

    #[ORM\Column]
    #[Groups(["invoice:read", "customer:read"])]
    #[Assert\DateTime(message: "La date doit être au bon format")]
    #[Assert\NotBlank(message: "Date envoi obligatoire")]
    private $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(["invoice:read", "customer:read"])]
    #[Assert\NotBlank(message: "Statut obligatoire")]
    #[Assert\Choice(choices: ["SENT", "PAID", "CANCELLED"])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["invoice:read"])]
    #[Assert\NotBlank(message: "Customer obligatoire")]
    private ?Customer $customer = null;

    #[ORM\Column]
    #[Groups(["invoice:read", "customer:read"])]
    #[Assert\NotBlank(message: "Chrono obligatoire")]
    #[Assert\Type(type: "numeric", message: "Valeur numérique attendue pour le chrono")]
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

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTime
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
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

<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class InvoiceIncrementationController
{
    public function __construct(private EntityManagerInterface $manager)
    {
    }

    public function __invoke(Invoice $data): Invoice
    {
        $data->setChrono($data->getChrono()+1);
        $this->manager->flush($data);
        return $data;
    }
}